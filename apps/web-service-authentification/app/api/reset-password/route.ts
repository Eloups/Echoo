import { NextRequest, NextResponse } from 'next/server';

const API_AUTH_INTERNAL_URL = process.env.API_AUTH_INTERNAL_URL || 'http://api-auth:3333';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Appel API depuis le serveur (dans Docker)
    const response = await fetch(`${API_AUTH_INTERNAL_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || 'Le lien de réinitialisation est invalide ou a expiré.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la réinitialisation.' },
      { status: 500 }
    );
  }
}
