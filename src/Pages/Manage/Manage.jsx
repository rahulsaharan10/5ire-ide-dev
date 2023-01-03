import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import ManageCustom from "../../Components/ManageCustomtocken/ManageCustom";
function Manage() {
  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders
          backTo={"/setting"}
          title={"Address Book"}
          searchTo={"/setting"}
        />
        <div className={`flexedContent`}>
          {/* <div>
            <ManageCustom currency="btc" name="bitcoin" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Manage;
