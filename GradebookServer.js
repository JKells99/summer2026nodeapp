const http = require('http');
const gradebook = require('./Gradebook');

/**
 * Swagger Specification
 */
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Gradebook API',
    version: '1.0.0',
    description: 'A simple API for managing student grades',
  },
  paths: {
    '/add': {
      get: {
        summary: 'Add a student',
        parameters: [
          { name: 'name', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'grade', in: 'query', required: true, schema: { type: 'number' } }
        ],
        responses: { 200: { description: 'Student added successfully' } }
      }
    },
    '/list': {
      get: {
        summary: 'List all students',
        responses: { 200: { description: 'List of students' } }
      }
    },
    '/average': {
      get: {
        summary: 'Get class average',
        responses: { 200: { description: 'The class average' } }
      }
    },
    '/reset': {
      get: {
        summary: 'Reset gradebook',
        responses: { 200: { description: 'Gradebook cleared' } }
      }
    }
  }
};

/**
 * Utility: Send a JSON response
 */
const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

/**
 * Utility: Send an HTML response
 */
const sendHTML = (res, html) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};

/**
 * Utility: Send an Error response
 */
const sendError = (res, message, status = 400) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = url.searchParams;

  try {
    switch (url.pathname) {
      
      case '/add': {
        const name = params.get('name');
        const grade = parseFloat(params.get('grade'));
        const result = gradebook.addStudent(name, grade);
        return sendJSON(res, { message: result });
      }

      case '/average': {
        const average = gradebook.calculateAverageGradeForClass();
        return sendJSON(res, { classAverage: average });
      }

      case '/list': {
        return sendJSON(res, { students: gradebook.getStudents() });
      }

      case '/reset': {
        gradebook.resetGradeBook();
        return sendJSON(res, { message: "Gradebook cleared" });
      }

      case '/swagger.json': {
        return sendJSON(res, swaggerSpec);
      }

      case '/docs': {
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Gradebook API - Swagger UI</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
          </head>
          <body>
            <div id="swagger-ui"></div>
            <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
            <script>
              window.onload = () => {
                window.ui = SwaggerUIBundle({
                  url: '/swagger.json',
                  dom_id: '#swagger-ui',
                });
              };
            </script>
          </body>
          </html>
        `;
        return sendHTML(res, html);
      }

      default:
        return sendError(res, "Endpoint not found", 404);
    }
  } catch (error) {
    return sendError(res, error.message);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Beginner Gradebook Server running at http://localhost:${PORT}/`);
  console.log(` Swagger UI available at http://localhost:${PORT}/docs`);
});
