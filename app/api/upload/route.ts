// /app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Aquí subirías a Firebase, AWS S3, o tu servidor
    // Por ahora, simulamos una URL
    const imageUrl = `https://pampapro.com/uploads/${Date.now()}_${file.name}`;
    
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}