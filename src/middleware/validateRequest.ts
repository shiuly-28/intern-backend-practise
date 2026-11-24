import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isWrapped =
        schema instanceof z.ZodObject &&
        ("body" in schema.shape ||
          "query" in schema.shape ||
          "params" in schema.shape ||
          "cookies" in schema.shape);

      const dataToValidate = isWrapped
        ? {
            body: req.body,
            cookies: req.cookies,
            query: req.query,
            params: req.params,
          }
        : req.body;

      const result = await schema.safeParseAsync(dataToValidate);

      if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[issue.path.length - 1] ?? "unknown";
          const fieldKey = String(field);
          if (!fieldErrors[fieldKey]) {
            fieldErrors[fieldKey] = [issue.message];
          } else {
            fieldErrors[fieldKey].push(issue.message);
          }
        }

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: fieldErrors,
        });
      }

      if (isWrapped) {
        const parsed = result.data as Record<string, unknown>;
        if (parsed.body !== undefined) req.body = parsed.body;
        if (parsed.query !== undefined) Object.assign(req.query, parsed.query);
        if (parsed.params !== undefined) Object.assign(req.params, parsed.params);
      } else {
        req.body = result.data;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;