import { ApiResponse, HttpMethod, ApiError } from "@/api";

describe("API Types", () => {
  describe("ApiResponse", () => {
    test("should create a successful response with data", () => {
      const response: ApiResponse<string> = {
        success: true,
        data: "test data",
        timestamp: "2025-01-01T00:00:00.000Z",
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe("test data");
      expect(response.error).toBeUndefined();
    });

    test("should create a successful response without data", () => {
      const response: ApiResponse<string> = {
        success: true,
        timestamp: "2025-01-01T00:00:00.000Z",
      };

      expect(response.success).toBe(true);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeUndefined();
    });

    test("should create an error response", () => {
      const response: ApiResponse<string> = {
        success: false,
        error: "Something went wrong",
        timestamp: "2025-01-01T00:00:00.000Z",
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe("Something went wrong");
      expect(response.data).toBeUndefined();
    });

    test("should create response with complex data type", () => {
      interface User {
        id: string;
        name: string;
      }

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: "123",
          name: "John Doe",
        },
        timestamp: "2025-01-01T00:00:00.000Z",
      };

      expect(response.success).toBe(true);
      expect(response.data?.id).toBe("123");
      expect(response.data?.name).toBe("John Doe");
    });
  });

  describe("HttpMethod", () => {
    test("should accept valid HTTP methods", () => {
      const get: HttpMethod = "GET";
      const post: HttpMethod = "POST";
      const put: HttpMethod = "PUT";
      const delete_: HttpMethod = "DELETE";
      const patch: HttpMethod = "PATCH";

      expect(get).toBe("GET");
      expect(post).toBe("POST");
      expect(put).toBe("PUT");
      expect(delete_).toBe("DELETE");
      expect(patch).toBe("PATCH");
    });
  });

  describe("ApiError", () => {
    test("should create a basic error", () => {
      const error: ApiError = {
        code: "VALIDATION_ERROR",
        message: "Invalid input provided",
      };

      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.message).toBe("Invalid input provided");
      expect(error.details).toBeUndefined();
    });

    test("should create an error with details", () => {
      const error: ApiError = {
        code: "VALIDATION_ERROR",
        message: "Invalid input provided",
        details: {
          error: [{ field: "email", message: "Invalid email format" }],
        },
      };

      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.message).toBe("Invalid input provided");
    });

    test("should create an error with complex details", () => {
      const error: ApiError = {
        code: "MULTIPLE_ERRORS",
        message: "Multiple validation errors occurred",
        details: {
          errors: [
            { field: "email", message: "Required" },
            { field: "password", message: "Too short" },
          ],
        },
      };

      expect(error.details?.errors).toHaveLength(2);
    });
  });
});
