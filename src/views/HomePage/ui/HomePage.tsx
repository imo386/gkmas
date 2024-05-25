import Link from "next/link";

import cls from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={cls.homepage}>
      <h1 className={cls.title}>学マスUtil</h1>
      <Link href="/evaluation-calculator">
        <div className="card w-96 bg-neutral shadow-xl">
          <div className="card-body">
            <h2 className="card-title">最終評価を計算する</h2>
            <p>最終評価で必要なポイントを計算します</p>
          </div>
        </div>
      </Link>
      <div className="card w-96 bg-success text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Coming Soon</h2>
          <p>Tool</p>
        </div>
      </div>
      <div className="card w-96 bg-success text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Coming Soon</h2>
          <p>Tool</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
