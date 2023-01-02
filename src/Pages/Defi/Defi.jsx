import React from "react";
import DefiList from "../../Components/DefiComponent/DefiList";
import DefiHeading from "../../Components/DefiComponent/DefiHeading.jsx";
import style from "./style.module.scss"
function Defi() {
  const data = [
    {
      stakingHead: "Pancake farming",
      desc: "It is a long established fact that a reader.....",
    },
    {
      stakingHead: "Aava Staking",
      desc: "It is a long established fact that a reader.....",
    },
    {
      stakingHead: "Lido Staking",
      desc: "It is a long established fact that a reader.....",
    },
  ];
  const user2 = [
    {
      stakingHead: "Pancake farming",
      desc: "It is a long established fact that a reader.....",
    },
    {
      stakingHead: "Aava Staking",
      desc: "It is a long established fact that a reader.....",
    },
    {
      stakingHead: "Lido Staking",
      desc: "It is a long established fact that a reader.....",
    },
  ];
  const user3 = [
    {
      stakingHead: "Pancake farming",
      desc: "It is a long established fact that a reader.....",
    },
    {
      stakingHead: "Aava Staking",
      desc: "It is a long established fact that a readerfact that a reader.....",
    },
    {
      stakingHead: "Lido Staking",
      desc: "It is a long established fact that a reader.....",
    },
  ];

  return (
    <div className="">
      <div className={style.bordered}>
        <DefiHeading header="Staking Section" />
        {data.map((user) => (
          <DefiList desc={user.desc} stakingHead={user.stakingHead} />
        ))}
      </div>
      <div className={style.bordered}>
        <DefiHeading header="Yield farming" />
        {data.map((user2) => (
          <DefiList desc={user2.desc} stakingHead={user2.stakingHead} />
        ))}
      </div>
      <div className={style.bordered}>
        <DefiHeading header="History" />
        {data.map((user3) => (
          <DefiList desc={user3.desc} stakingHead={user3.stakingHead} />
        ))}
      </div>
    </div>
  );
}

export default Defi;
