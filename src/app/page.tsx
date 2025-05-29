"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setError("");
    setSuccess(false);
    try {
      const res = await axios.post("/api/login", credentials);
      if (res.data.success) {
        setSuccess(true);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/background-desktop.png')]">
      <div className="flex justify-center p-32">
        <h1 className="text-5xl"></h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 z-20">
        <div className="card w-[50%] bg-transparent card-md ">
          <div className="card-title flex justify-center">
            <h1 className="text-3xl">Telegram Custom Signal Generator</h1>
          </div>
          <div className="card-body flex justify-center items-center">
            <fieldset className="fieldset w-96 flex items-center justify-center">
              <legend className="fieldset-legend truncate w-full">
                Username
              </legend>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="input bg-transparent hover:bg-gray-700 border-white w-full"
              />
              {/* <p className="label">Optional</p> */}
            </fieldset>
            <fieldset className="fieldset w-96 flex items-center justify-center">
              <legend className="fieldset-legend truncate w-full">
                Password
              </legend>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="input bg-transparent hover:bg-gray-700 border-white w-full"
              />
              {/* <p className="label">Optional</p> */}
            </fieldset>
            <button
              className="btn w-96 btn-outline hover:bg-gray-700 mt-5"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            {error && <p className="pt-5 text-red-500">{error}</p>}
            {success && <p className="text-5xl text-white">{success}</p>}
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
    </main>
  );
}
