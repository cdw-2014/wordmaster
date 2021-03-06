// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SOLUTION_WORDS } from "../../constants/solutionWords";

export const getWord = () => {
  return SOLUTION_WORDS[Math.floor(Math.random() * SOLUTION_WORDS.length)];
};

export function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  res.status(200).send(getWord());
}
