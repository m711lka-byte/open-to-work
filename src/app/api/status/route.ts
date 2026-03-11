import { resumeData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  const { status } = resumeData.meta;
  const apiStatus = {
    open_to_work: status.openToWork,
    availability: status.availability,
    preferred_roles: status.preferredRoles,
    remote_preference: status.remotePreference,
  };
  return NextResponse.json(apiStatus);
}
