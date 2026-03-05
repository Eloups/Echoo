'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Vérification en cours...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`/api/verify-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: params.token,
                    }),
                });
                if (response.ok) {
                    setStatus('success');
                    setMessage('Votre email a été vérifié avec succès !');
                } else {
                    const error = await response.json();
                    setStatus('error');
                    setMessage(error.message || 'Le lien de vérification est invalide ou a expiré.');
                }
            } catch {
                setStatus('error');
                setMessage('Une erreur est survenue lors de la vérification.');
            }
        };

        if (params.token) {
            verifyEmail();
        }
    }, [params.token, router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center'
        }}>
            {status === 'verifying' && (
                <>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
                    <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Vérification en cours...</h1>
                    <p>{message}</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <h1 style={{ fontSize: '24px', marginBottom: '10px', color: 'green' }}>Email vérifié !</h1>
                    <p>{message}</p>
                    <p style={{ marginTop: '20px', color: '#666' }}>
                        Vous pouvez maintenant fermer cette page et vous connecter sur l&apos;application mobile Echoo.
                    </p>
                </>
            )}

            {status === 'error' && (
                <>
                    <h1 style={{ fontSize: '24px', marginBottom: '10px', color: 'red' }}>Erreur de vérification</h1>
                    <p>{message}</p>
                    <p>Essayer de vérifier votre email à nouveau.</p>
                </>
            )}
        </div>
    );
}