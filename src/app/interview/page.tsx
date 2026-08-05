"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { questions } from "@/data/questions";

export default function InterviewPage() {

  const [index, setIndex] = useState(0);

  const [show, setShow] = useState(false);

  const current = questions[index];

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-3xl space-y-6">

        <h1 className="text-4xl font-bold">
          Interview Practice
        </h1>

        <div className="rounded-xl bg-slate-900 p-6">

          <h2 className="text-2xl font-bold">

            {current.question}

          </h2>

          {show && (

            <p className="mt-5 text-slate-300">

              {current.answer}

            </p>

          )}

        </div>

        <div className="flex gap-4">

          <button

            onClick={() => setShow(true)}

            className="rounded-xl bg-indigo-600 px-6 py-3"

          >

            Show Answer

          </button>

          <button

            onClick={() => {

              setShow(false);

              setIndex((index + 1) % questions.length);

            }}

            className="rounded-xl bg-green-600 px-6 py-3"

          >

            Next

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}