import { UserProfile, CompleteAnalysisResponse, SyntheticPersona } from '../types';

const API_BASE = '/api';

export async function fetchPersonas(): Promise<SyntheticPersona[]> {
  const res = await fetch(`${API_BASE}/personas`);
  if (!res.ok) throw new Error('Failed to load personas');
  return res.json();
}

export async function analyzeProfile(profile: UserProfile): Promise<CompleteAnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  if (!res.ok) throw new Error('Analysis failed');
  return res.json();
}

export async function parseDocument(documentContent: string, mimeType?: string): Promise<{ parsedProfile: UserProfile; analysis: CompleteAnalysisResponse }> {
  const res = await fetch(`${API_BASE}/parse-doc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentContent, mimeType })
  });
  if (!res.ok) throw new Error('Document parsing failed');
  return res.json();
}

export async function sendChatMessage(message: string, analysisContext: CompleteAnalysisResponse): Promise<{ reply: string }> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, analysisContext })
  });
  if (!res.ok) throw new Error('Chat failed');
  return res.json();
}
