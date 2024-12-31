import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { query } = req.body
    
    // Simulated response for preview
    const response = `Respuesta simulada para la consulta: ${query}`
    
    res.status(200).json({ response })
  } else {
    res.status(405).json({ response: 'Método no permitido' })
  }
}

