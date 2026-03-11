
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { getOptimizedStatus, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, CheckCircle, Code, List, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/lib/data';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'جارِ التحسين...' : 'تحسين باستخدام الذكاء الاصطناعي'}
      <Bot className="mr-2" />
    </Button>
  );
}

export default function OpenToWorkPage() {
  const [state, formAction] = useActionState(getOptimizedStatus, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-headline font-bold">محسن حالة "متاح للعمل"</h1>
        <p className="text-muted-foreground mt-2">
          استخدم الذكاء الاصطناعي لتخصيص حالة "متاح للعمل" الخاصة بك لتحقيق أقصى قدر من الظهور لدى مسؤولي التوظيف وأنظمة تتبع المتقدمين (ATS).
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>تفضيلاتك الوظيفية</CardTitle>
            <CardDescription>املأ حالتك وتفضيلاتك الحالية. سيستخدم الذكاء الاصطناعي هذا لإنشاء ملف شخصي مُحسَّن.</CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="availability">الجهوزية للعمل</Label>
                <Input id="availability" name="availability" placeholder="مثال: متاح فوراً، إشعار لمدة أسبوعين" defaultValue={resumeData.meta.status.availability} />
                {state.errors?.availability && <p className="text-sm text-destructive">{state.errors.availability[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredRoles">الوظائف المفضلة (وظيفة في كل سطر)</Label>
                <Textarea id="preferredRoles" name="preferredRoles" placeholder="مثال: مندوب مبيعات أول..." rows={4} defaultValue={resumeData.meta.status.preferredRoles.join('\n')}/>
                {state.errors?.preferredRoles && <p className="text-sm text-destructive">{state.errors.preferredRoles[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label>تفضيل العمل عن بعد</Label>
                <RadioGroup name="remotePreference" defaultValue={resumeData.meta.status.remotePreference} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Remote Only" id="remote-only" />
                    <Label htmlFor="remote-only">عن بعد فقط</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Hybrid" id="hybrid" />
                    <Label htmlFor="hybrid">هجين</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="On-site" id="on-site" />
                    <Label htmlFor="on-site">في الموقع</Label>
                  </div>
                </RadioGroup>
                {state.errors?.remotePreference && <p className="text-sm text-destructive">{state.errors.remotePreference[0]}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>الحالة المُحسَّنة بالذكاء الاصطناعي</CardTitle>
            <CardDescription>النتيجة التي تم إنشاؤها، جاهزة للاستخدام في ملفاتك الشخصية المهنية.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {state.data ? (
              <div className="space-y-6">
                 <Alert variant="default" className="bg-primary/5 border-primary/20">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary font-bold">نجاح!</AlertTitle>
                  <AlertDescription>
                    {state.message}
                  </AlertDescription>
                </Alert>
                <div>
                  <h3 className="font-semibold text-lg mb-2">ملخص مقروء للبشر</h3>
                  <p className="text-muted-foreground p-4 bg-muted rounded-md border">{state.data.humanReadableSummary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Terminal className="ml-2" /> تفصيل مُحسَّن لأنظمة ATS
                  </h3>
                  <div className="space-y-3 text-sm p-4 bg-muted rounded-md border">
                    <p><strong>علامة "متاح للعمل":</strong> <Badge variant={state.data.atsOptimizedStatus.openToWorkFlag ? "default" : "secondary"}>{state.data.atsOptimizedStatus.openToWorkFlag ? 'صحيح' : 'خطأ'}</Badge></p>
                    <p><strong>الجهوزية:</strong> {state.data.atsOptimizedStatus.availabilityPhrase}</p>
                    <p><strong>تفضيل العمل عن بعد:</strong> {state.data.atsOptimizedStatus.remoteWorkPreference}</p>
                    <div>
                      <h4 className="font-medium flex items-center mb-1"><List className="ml-2 h-4 w-4" />الوظائف المُحسَّنة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {state.data.atsOptimizedStatus.optimizedRoles.map(role => <Badge key={role} variant="secondary">{role}</Badge>)}
                      </div>
                    </div>
                     <div>
                      <h4 className="font-medium flex items-center mb-1"><Code className="ml-2 h-4 w-4" />الكلمات المفتاحية ذات الصلة:</h4>
                       <div className="flex flex-wrap gap-2">
                        {state.data.atsOptimizedStatus.relevantKeywords.map(kw => <Badge key={kw} variant="outline">{kw}</Badge>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
               <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Bot className="mx-auto h-12 w-12 mb-4" />
                    <p>ستظهر حالتك المحسنة هنا.</p>
                  </div>
              </div>
            )}
          </CardContent>
          {state.data && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">انسخ هذه المعلومات إلى ملفك الشخصي على LinkedIn وسيرتك الذاتية ومواقع التواصل المهني الأخرى.</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
