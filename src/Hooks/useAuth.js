import bcrypt from "bcryptjs";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setPassword } from "../Store/reducer/auth";

export default function useAuth() {
  const { pass } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setUserPass = async (p) => {
    try {
      var salt = bcrypt.genSaltSync(10);
      let hash;
      if (salt) {
        hash = bcrypt.hashSync(p, salt);
        if (hash) {
          dispatch(setPassword(hash));
          dispatch(setLogin(true));
          window.chrome.storage.session.set({ login: true }).then((res) => {
            console.log("Response of session pass : ", res?.login);
          });
          return {
            error: false,
            data: "Successfully created password for user!",
          };
        } else {
          return {
            error: true,
            data: "Error while setting up password for user!",
          };
        }
      } else {
        return {
          error: true,
          data: "Error while setting up password for user!",
        };
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
      return {
        error: true,
        data: "Error occured!",
      };
    }
  };

  const verifyPass = async (p) => {
    try {
      let res = bcrypt.compareSync(p, pass);

      if (res) {
        dispatch(setLogin(true));
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

      // bcrypt.compare(p, pass, (err, success) => {
      //     if (err) {
      //         console.log("Error : ", err);
      //         return {
      //             error: true,
      //             data: "Invalid Password!"
      //         }
      //     }
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Error Occured!",
      };
    }
  };

  return {
    verifyPass,
    setUserPass,
  };
}
