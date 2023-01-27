import bcrypt from "bcryptjs";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setPassword } from "../Store/reducer/auth";
export default function useAuth() {
  const { pass } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setUserPass = async (p) => {
    return new Promise((resolve) => {
      try {
        var salt = bcrypt.genSaltSync(10);
        let hash;
        if (salt) {
          hash = bcrypt.hashSync(p, salt);
          if (hash) {
            dispatch(setPassword(hash));
            window.chrome.storage.session.set({ login: true }).then((res) => {
              console.log("Response of session pass : ", res?.login);
            });
            resolve({
              error: false,
              data: "Successfully created password for user!",
            });
          } else {
            resolve({
              error: true,
              data: "Error while setting up password for user!",
            });
          }
        } else {
          resolve({
            error: true,
            data: "Error while setting up password for user!",
          });
        }

        // bcrypt.genSalt(10, function (err, salt) {
        //     if (salt)
        //         bcrypt.hash(p, salt, function (err, hash) {

        //             if (err) {
        //                 console.log("Error : ", err);
        //                 return {
        //                     error: true,
        //                     data: "Error while setting up password for user!"
        //                 }
        //             }
        //             if (hash) {
        //                 dispatch(setPassword(hash));
        //                 window.chrome.storage.session.set({ login: true }).then(res => {
        //                     console.log("Response of seeion pass");
        //                 });
        //                 return {
        //                     error: false,
        //                     data: "Successfully created password for user!"
        //                 }

        //             }
        //         });
        //     if (err) {
        //         console.log("Error : ", err);
        //         return {
        //             error: true,
        //             data: "Error while setting up password for user!"
        //         }

        //     }
        // });
      } catch (error) {
        console.log("Error : ", error);
        resolve({
          error: true,
          data: "Error occured!",
        });
      }
    });
  };

  const verifyPass = async (p) => {
    try {
      let res = bcrypt.compareSync(p, pass);

      if (res) {
        window.chrome.storage.session.set({ login: true });
        return {
          error: false,
          data: "Login successfully!",
        };
      } else {
        return {
          error: true,
          data: "Incorrect password!",
        };
      }
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Error Occured!",
      };
    }
  };

  const logout = () => {
    try {
      console.log("logout called!!");
      dispatch(setLogin(false));
      window.chrome.storage.session.remove(["login"]).then((res) => {
        console.log("logout res : ", res);
      });

      return {
        error: false,
        data: "Logout successfully!",
      };
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: false,
        data: "Error while logging out!",
      };
    }
  };

  return {
    verifyPass,
    setUserPass,
    logout,
  };
}
