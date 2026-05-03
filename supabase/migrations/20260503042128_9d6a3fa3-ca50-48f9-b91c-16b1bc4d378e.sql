DROP POLICY "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(phone) BETWEEN 1 AND 30
  AND length(email) BETWEEN 3 AND 255
  AND (website IS NULL OR length(website) <= 255)
  AND length(project_type) BETWEEN 1 AND 60
  AND (budget IS NULL OR length(budget) <= 60)
  AND (message IS NULL OR length(message) <= 2000)
);