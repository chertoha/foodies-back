import swaggerJSDoc from "swagger-jsdoc";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || `http://localhost:${process.env.PORT || 8000}/api`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Foodies REST API Docs",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your bearer token in the format **Bearer <token>**",
        },
      },
    },
    servers: [{ url: BACKEND_API_URL }],
    security: [{ bearerAuth: [] }],
  },
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
