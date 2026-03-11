
'use server';

import { optimizeOpenToWorkStatus, OptimizeOpenToWorkStatusInput } from '@/ai/flows/optimize-open-to-work-status';
import { z } from 'zod';

const formSchema = z.object({
  availability: z.string().min(3, 'Availability is required.'),
  preferredRoles: z.string().min(3, 'Please list at least one preferred role.'),
  remotePreference: z.string().min(3, 'Remote preference is required.'),
});

export type FormState = {
  message: string;
  data?: {
    humanReadableSummary: string;
    atsOptimizedStatus: {
        openToWorkFlag: boolean;
        optimizedRoles: string[];
        availabilityPhrase: string;
        remoteWorkPreference: string;
        relevantKeywords: string[];
    };
  }
  errors?: {
    availability?: string[];
    preferredRoles?: string[];
    remotePreference?: string[];
    _form?: string[];
  };
};

export async function getOptimizedStatus(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    availability: formData.get('availability'),
    preferredRoles: formData.get('preferredRoles'),
    remotePreference: formData.get('remotePreference'),
  });

  if (!validatedFields.success) {
    return {
      message: 'فشل التحقق. يرجى التحقق من المدخلات الخاصة بك.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { availability, preferredRoles, remotePreference } = validatedFields.data;
  
  const rolesArray = preferredRoles.split('\n').map(role => role.trim()).filter(role => role.length > 0);

  if (rolesArray.length === 0) {
    return {
      message: 'فشل التحقق.',
      errors: {
        preferredRoles: ['يرجى تقديم دور واحد على الأقل.'],
      },
    };
  }

  const aiInput: OptimizeOpenToWorkStatusInput = {
    availability,
    preferredRoles: rolesArray,
    remotePreference,
  };

  try {
    const result = await optimizeOpenToWorkStatus(aiInput);
    if (!result) {
      return {
        message: 'خطأ: لم يُرجع نموذج الذكاء الاصطناعي نتيجة.',
        errors: { _form: ['فشل تحسين الذكاء الاصطناعي. حاول مرة اخرى.'] },
      };
    }
    return {
      message: 'نجاح! تم تحسين حالة "متاح للعمل" الخاصة بك.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'حدث خطأ غير متوقع.',
      errors: { _form: ['حدث خطأ ما. يرجى المحاولة مرة أخرى في وقت لاحق.'] },
    };
  }
}
