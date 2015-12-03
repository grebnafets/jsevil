/*
	SEMICOLON FOR LIFE!!!
*/

package main;

import (
	"fmt";
	"runtime";
	"net/http";
	"os";
	"io/ioutil";
);

const (
	EXIT_SUCCESS int = 0;
	EXIT_FAILURE int = -1;
)

func main() {
	state := &stateno{};
	state.Init();
	ajax(state);
}

/* Yeah... I am obsessed with this stateno... {{{ */
type stateno struct {
	bad bool; /* You always want to know bad */
	shh bool; /* You might want to see !bad */
	str string;
	err error;
	interrupt bool;
};

func (s *stateno) Init() {
	s.bad = false;
	s.shh = true;
	s.str = "";
	s.interrupt = false;
}

func (s *stateno) Set(state string, bad bool) {
	s.bad = bad;
	s.str = state;
}

func (s *stateno) ErrCheck() {
	if (s.err != nil) {
		s.bad = true;
		s.str = s.err.Error();
	}
}

func postValidate(state *stateno) {
	if (state.bad) {
		_, file, line, _ := runtime.Caller(2);
		pc, _, _, _ := runtime.Caller(1);
		f := runtime.FuncForPC(pc)
		fmt.Printf("@%d:%s:%s:%s\n", line, f.Name(), file, state.str);
	} else if (!state.bad && !state.shh) {
		fmt.Printf("%s\n", state.str);
	}
}
/* }}} */
func ajax(state *stateno) {
	defer postValidate(state);
	exitSignal := func(state *stateno) {
		go func() {
			for {
				if (state.interrupt) {
					os.Exit(EXIT_SUCCESS);
				}
				runtime.Gosched();
			}
		}();
	};
	mainHandler := func (w http.ResponseWriter, r *http.Request) {
		req := r.URL.Query().Get("data");
		/*TODO: Associate get request with file and return contents. */
		send := "What?";
		if (req == "macro") {
			send = "polo";
		}
		clen := r.Header.Get("Content-Length");
		if (clen != "") {
			defer r.Body.Close();
			var body []byte;
			body, state.err = ioutil.ReadAll(r.Body);
			state.ErrCheck();
			send += string(body);
		}
		w.Header().Set("Access-Control-Allow-Origin", "*");
		fmt.Fprintf(w, "%s", send);
	};
	exitHandler := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*");
		fmt.Fprintf(w, "Shutting down");
		state.interrupt = true;
	};
	http.HandleFunc("/", mainHandler);
	http.HandleFunc("/exit", exitHandler);
	go  exitSignal(state);
	http.ListenAndServe(":8080", nil);
}
