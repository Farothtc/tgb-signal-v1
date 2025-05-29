"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [operationSuc, setOperationSuc] = useState(false);
  const [generatedErr, setGeneratedErr] = useState("");

  const handleSendMsg = async () => {
    try {
      const res = await axios.post("/api/send-signal", { message });
      if (res.data.success) {
        setOperationSuc(true);
      }
    } catch (err: any) {
      setGeneratedErr(err.response?.data?.message || "Msg failed");
    }
  };

  console.log(operationSuc, generatedErr);

  return (
    <div className="min-h-screen bg-[url('/background-desktop.png')]">
      <div className="p-32"></div>
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="card w-[30%] bg-transparent card-md">
          <div className="card-body flex justify-center items-center">
            <fieldset className="fieldset w-96">
              <legend className="fieldset-legend">Write your message</legend>
              <textarea
                name="message"
                className="textarea h-24 bg-transparent hover:bg-gray-700 border-white w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type here"
              ></textarea>
            </fieldset>
            <button
              className="btn w-96 btn-outline hover:bg-gray-700"
              onClick={handleSendMsg}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src={"/pattern-squiggly-line-bottom-desktop.svg"}
          alt="Line"
          height={400}
          width={825}
        ></Image>
      </div>
      <div className="absolute top-0 right-0">
        <Image
          src={"/pattern-squiggly-line-top.svg"}
          alt="Line"
          width={446}
          height={208}
        ></Image>
      </div>
    </div>
  );
}
