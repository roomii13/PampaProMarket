import { NextResponse } from "next/server";

// Simulación de almacenamiento (solo memoria)
// para persistencia REAL, preparar un sistema con DB.
let mensajes: {
  id: string;
  prestadorId: string;
  usuarioId: string;
  mensaje: string;
  fecha: string;
}[] = [];

/**
 * GET → Obtiene todos los mensajes entre un usuario y un prestador
 * URL ejemplo:
 * /api/chat?usuarioId=123&prestadorId=456
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const usuarioId = searchParams.get("usuarioId");
  const prestadorId = searchParams.get("prestadorId");

  if (!usuarioId || !prestadorId) {
    return NextResponse.json(
      { error: "Faltan parámetros usuarioId o prestadorId" },
      { status: 400 }
    );
  }

  const chat = mensajes.filter(
    (m) =>
      (m.usuarioId === usuarioId && m.prestadorId === prestadorId) ||
      (m.usuarioId === prestadorId && m.prestadorId === usuarioId)
  );

  return NextResponse.json(chat, { status: 200 });
}

/**
 * POST → Enviar mensaje al chat
 * Body esperado:
 * {
 *   "usuarioId": "123",
 *   "prestadorId": "456",
 *   "mensaje": "Hola, quisiera pedir tu servicio"
 * }
 */
export async function POST(req: Request) {
  const data = await req.json();
  const { usuarioId, prestadorId, mensaje } = data;

  if (!usuarioId || !prestadorId || !mensaje) {
    return NextResponse.json(
      { error: "Datos incompletos" },
      { status: 400 }
    );
  }

  const nuevoMensaje = {
    id: crypto.randomUUID(),
    usuarioId,
    prestadorId,
    mensaje,
    fecha: new Date().toISOString(),
  };

  mensajes.push(nuevoMensaje);

  return NextResponse.json(
    { ok: true, mensaje: nuevoMensaje },
    { status: 201 }
  );
}
