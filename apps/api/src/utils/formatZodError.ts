import { ZodIssue } from "zod";

type FormattedZodErrors = {
  [key: string | number]: string | FormattedZodErrors;
};

export default function formatZodIssues(issues: ZodIssue[]): FormattedZodErrors {
  const errors: FormattedZodErrors = {};
  issues.forEach((issue) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = errors;
    for (let i = 0; i < issue.path.length; i++) {
      const segment = issue.path[i];
      if (i === issue.path.length - 1) {
        current[segment] = issue.message;
      } else {
        current[segment] = current[segment] || {};
        current = current[segment];
      }
    }
  });
  return errors;
}
