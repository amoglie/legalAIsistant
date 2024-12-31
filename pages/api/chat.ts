import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    // TODO: Integrate with actual backend logic
    res.status(200).json({ message: 'Esta es una respuesta simulada del backend.' })
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}

