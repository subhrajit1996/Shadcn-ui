"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const promises = [
      "https://demo6396395.mockable.io/bcf-boards",
      "https://demo6396395.mockable.io/prompts",
    ];
    const GetData = async () => {
      try {
        const fetchPromises = promises.map((url) =>
        fetch(url).then((response) => response.json())
        );
        const responses = await Promise.all(fetchPromises);
        setBoards(responses[0]?.boards);
        setPrompts(responses[1]);
      } catch (err) {
        console.error(err);
      } finally {
         setLoading(false);
      }
    };
    GetData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Prompts
            </h1>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {prompts.map((prompt) => (
                <li key={prompt.id}>{prompt.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Boards
            </h1>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {boards.map((board) => (
                <div key={board.id}>
                  <li>{board.name}</li>

                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {board.bcfs.map((bcf) => (
                      <li key={bcf.id}>{bcf.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
