# URL Shortener Backend

A RESTful URL Shortener API built with Node.js, Express.js, and MongoDB that generates unique short URLs, redirects users to the original destination, prevents duplicate entries, and tracks click analytics.
## Features

- Generate unique shortened URLs using **NanoID**.
- Redirect users to the original URL using the generated short link.
- Prevent duplicate URL entries by returning the existing short code for previously shortened URLs.
- Track the number of times each shortened URL is accessed.
- Store URL mappings and click statistics in **MongoDB**.
- Validate user input by checking for missing or invalid URLs.
- Handle errors gracefully with appropriate HTTP status codes (400, 404, and 500).
