import { NextRequest, NextResponse } from 'next/server';

const API_AUTH_INTERNAL_URL = process.env.API_AUTH_INTERNAL_URL || 'http://api-auth:3333';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // Appel API depuis le serveur (dans Docker)
    // Peut utiliser le nom du service api-auth:3333
    const response = await fetch(`${API_AUTH_INTERNAL_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || 'Le lien de vérification est invalide ou a expiré.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la vérification.' },
      { status: 500 }
    );
  }
}
