let timer;

export default {
  login(context, payload) {},
  async signup(context, payload) {
    return await context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async login(context, payload) {
    return await context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    clearTimeout(timer);
  },
  tryLogin(context, payload) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("expirationDate");

    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    } else {
      return;
    }
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("didLogout");
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3m8tvJAGREGBU_x6_stl6lcc8z8xXPmM";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3m8tvJAGREGBU_x6_stl6lcc8z8xXPmM";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to authenticate");
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 60;
    const expirationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("expirationDate", expirationDate);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
};
