"use client";

import { useState, useEffect } from "react";
import {
  calculateRankWithScore,
  type Position,
  type EvaluationResult,
} from "../lib/evaluate";

const EvaluationForm: React.FC = () => {
  const [position, setPosition] = useState<Position>(1);
  const [vocal, setVocal] = useState<number>(0);
  const [dance, setDance] = useState<number>(0);
  const [visual, setVisual] = useState<number>(0);
  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResult | null>(null);

  useEffect(() => {
    const result = calculateRankWithScore(position, vocal, dance, visual);
    setEvaluationResult(result);
  }, [position, vocal, dance, visual]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">
        最終評価で必要なポイント - 学マスUtil
      </h1>
      <div className="flex space-x-4 space-x-4">
        <label htmlFor="position" className="self-center">
          最終試験の順位:
        </label>
        <div className="flex-grow">
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as unknown as Position)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <div className="badge badge-error">ボーカルスコア</div>
        <input
          type="range"
          min={0}
          max={1500}
          value={vocal}
          onChange={(e: { target: { value: string } }) =>
            setVocal(Number.parseInt(e.target.value))
          }
          className="range range-error"
        />
        <input
          type="number"
          min={0}
          max={1500}
          placeholder="Vocal Score"
          value={vocal}
          className="input input-bordered w-full max-w-xs"
          onChange={(e: { target: { value: string } }) =>
            setVocal(Number.parseInt(e.target.value))
          }
        />
      </div>

      <div className="mt-4">
        <div className="badge badge-info">ダンススコア</div>
        <input
          type="range"
          min={0}
          max={1500}
          value={dance}
          onChange={(e: { target: { value: string } }) =>
            setDance(Number.parseInt(e.target.value))
          }
          className="range range-info"
        />
        <input
          type="number"
          min={0}
          max={1500}
          value={dance}
          className="input input-bordered w-full max-w-xs"
          onChange={(e: { target: { value: string } }) =>
            setDance(Number.parseInt(e.target.value))
          }
        />
      </div>

      <div className="mt-4">
        <div className="badge badge-warning">ビジュアルスコア</div>
        <input
          type="range"
          min={0}
          max={1500}
          value={visual}
          onChange={(e: { target: { value: string } }) =>
            setVisual(Number.parseInt(e.target.value))
          }
          className="range range-warning"
        />
        <input
          type="number"
          min={0}
          max={1500}
          value={visual}
          className="input input-bordered w-full max-w-xs"
          onChange={(e: { target: { value: string } }) =>
            setVisual(Number.parseInt(e.target.value))
          }
        />
      </div>
      {evaluationResult && (
        <div className="mt-8 border-t pt-4">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>最終評価</th>
                  <th>最終試験で必要な評価ポイント</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(evaluationResult.requiredPointDifferences).map(
                  ([rank, difference]) => (
                    <tr key={rank}>
                      <td>{rank}</td>
                      <td>{difference}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationForm;
