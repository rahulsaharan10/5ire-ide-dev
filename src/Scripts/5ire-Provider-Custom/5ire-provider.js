import { CONTENT_SCRIPT, INPAGE, getId } from "../constants";
import { WindowPostMessageStream } from "../stream";

//stream for in-window communication
const injectedStream = new WindowPostMessageStream({
    name: INPAGE,
    target: CONTENT_SCRIPT,
  });

/*
Custom Web3 provider for interacting with the 5ire browser extension and pass to
5ire extension to handle the json-rpc request and send the response back
*/
export class FireProvider {

    constructor(httpHost = "") {
        this.httpHost = httpHost;
        this.selectedAddress = null;
        this.chainId = "0x3e5";
        this.networkVersion = 997;
        this.version = "1.0.0";
        this.is5ire = true

        //for handling the different Promise handlers
        this.handlers  = {};
    }

    //for sending some payload with json rpc request
    async send(method, payload) {
        return this.passReq(method, payload);
    }

    //passing callback for async operations
    sendAsync(payload, cb) {
        this.passReq(payload)
            .then((res) => cb(res, null))
            .catch((err) => cb(null, err))
    }

    //requesting some data from chain
    async request(method, payload) {

        console.log("here it is inside injected script: ", method, payload);

        return this.passReq(method, payload);
    }


    //for checking JSON-RPC headers
    async passReq(method, payload) {
        if (method === undefined && method.trim() === "") return Error("invalid method");


        //pass the request to extension
        const isObject = typeof(method) === "object";

        //check if request for network version and eth_accounts
        const networkIdRes = {
            "jsonrpc": "2.0",
            "result": this.networkVersion
        }
        if(isObject && !payload && method.method === "net_version") return networkIdRes;
        else if(method === "net_version") return networkIdRes; 
        if(isObject && !payload && method.method === "eth_accounts") return networkIdRes.result = []
        else if(method === "eth_accounts") return networkIdRes.result = []

        const res  = await this.sendMessage(isObject ? method.method : method, !payload && isObject ? method.params:payload);
        if(res.method !== undefined && res.method === "eth_requestAccounts") this.injectSelectedAccount(res);

        return res;
    }



    //internal function used to pass request to extension
    sendMessage(method, payload={}) {
        return new Promise((resolve, reject) => {
          try {
            //check for if payload is passed us null
            if(typeof(payload) !== Object || payload ===  undefined || payload ===  undefined) payload = {};
            const id = getId();

            //handler added with a random id and promise reject and resolve functionss
            this.handlers[id] = { reject, resolve, id };
      
            if (method === "eth_requestAccounts") {
                payload["origin"] = window.location.origin;
            }


            //object to send over window data stream
            const transportRequestMessage = {
              id,
              payload,
              origin: INPAGE,
              method,
            };
      
            injectedStream.write(transportRequestMessage);
      
          } catch (err) {
            console.log("Error in send message while passing request to the extension ", err);
            reject(err);
          }
        });
      }


      //inject accounts into provider
      injectSelectedAccount(res) {
        this.selectedAddress = res.result[0]
      }
}