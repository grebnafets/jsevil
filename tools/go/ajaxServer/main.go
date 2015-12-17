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
	state := &Stateno{};
	state.Init();
	ajax(state);
}

/* Yeah... I am obsessed with this Stateno... {{{ */
type Stateno struct {
	Bad bool; /* You always want to know Bad */
	ShowAll bool; /* You might want to see !Bad */
	Str string;
	Err error;
	Interrupt bool;
};

func (s *Stateno) Init() {
	s.Bad = false;
	s.ShowAll = true;
	s.Str = "";
	s.Interrupt = false;
}

func (s *Stateno) Set(state string, Bad bool) {
	s.Bad = Bad;
	s.Str = state;
}

func (s *Stateno) ErrCheck() {
	if (s.Err != nil) {
		s.Bad = true;
		s.Str = s.Err.Error();
	}
}

func postValidate(state *Stateno) {
	if (state.Bad) {
		_, file, line, _ := runtime.Caller(2);
		pc, _, _, _ := runtime.Caller(1);
		f := runtime.FuncForPC(pc)
		fmt.Printf("@%d:%s:%s:%s\n", line, f.Name(), file, state.Str);
	} else if (!state.Bad && !state.ShowAll) {
		fmt.Printf("%s\n", state.Str);
	}
}
/* }}} */

func ajax(state *Stateno) {
	defer postValidate(state);
	exitSignal := func(state *Stateno) {
		go func() {
			for {
				if (state.Interrupt) {
					os.Exit(EXIT_SUCCESS);
				}
				runtime.Gosched();
			}
		}();
	};
/*
	calendarTest := func(w http.ResponseWriter, r *http.Request) {
		d := r.URL.Query().Get("d");
		m := r.URL.Query().Get("m");
		y := r.URL.Query().Get("y");
	};
*/
	getBody := func(w http.ResponseWriter, r *http.Request) string {
		var contents string;
		clen := r.Header.Get("Content-Length");
		if (clen != "") {
			defer r.Body.Close();
			var body []byte;
			body, state.Err = ioutil.ReadAll(r.Body);
			state.ErrCheck();
			contents = string(body);
		} else {
			contents = "";
		}
		return contents;
	};

	sendResponce := func(w http.ResponseWriter, Str string) {
		w.Header().Set("Access-Control-Allow-Origin", "*");
		fmt.Fprintf(w, "%s", Str);
	};

	ajaxTest := func(w http.ResponseWriter, r *http.Request) {
		res  := "What?";
		rtype := r.Header.Get("rtype");
		testQuery := r.URL.Query().Get("test");
		if (testQuery == "macro") {
			res = "polo";
		}
		switch (rtype) {
		case "get", "post", "put", "del":
			res += rtype;
		}
		res += getBody(w, r);
		sendResponce(w, res);
	};

	mainHandler := func (w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("tok");
		user := r.Header.Get("user");
		switch (token) {
		case "test":
			if (user == "public") {
				ajaxTest(w, r);
			} else {
				sendResponce(w, "");
			}
		}
	};

	exitHandler := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*");
		fmt.Fprintf(w, "Shutting down");
		state.Interrupt = true;
	};
	http.HandleFunc("/", mainHandler);
	http.HandleFunc("/exit", exitHandler);
	go  exitSignal(state);
	http.ListenAndServe(":8080", nil);
}
