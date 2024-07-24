# 🚀 Demo-Jardin-botanico-AI
This project aims to develop a web application that allows users to analyze images using Azure Computer Vision services. The application is designed to be intuitive and easy to use, providing detailed analysis of images uploaded by users.

<img src="https://github.com/user-attachments/assets/422ed0b4-77f3-4155-aef7-adcb83474da2" width="49%"></img>

## 🛠 Project Components

### 👾 Frontend
- **Technologies Used**: HTML, CSS, JavaScript
- **Features**:
  - Clean and responsive user interface for image upload and display.
  - Forms for uploading images from the user's device.
  - Real-time display of analysis results.
  - Error handling and user feedback.

### 🐱‍👤 Backend
- **Technologies Used**: Azure Computer Vision, REST API
- **Features**:
  - Receiving images uploaded from the frontend.
  - Sending images to Azure Computer Vision for analysis via REST API.
  - Processing Azure's response and sending the results back to the frontend.

## 🎈 Workflow

1. **Image Upload**:
   - Users upload an image through a form on the web page.
   - The image is previewed in the user interface.

2. **Request to Azure Computer Vision**:
   - Upon image submission, the frontend sends a REST API request to the backend.
   - The backend forwards the image to Azure Computer Vision for analysis.
   - Azure Computer Vision processes the image and returns the analysis results.

3. **Displaying Results**:
   - The backend receives the results from Azure Computer Vision and sends them back to the frontend.
   - The frontend displays the results on the web page, providing details such as:
     - Object detection in the image.
     - Image description.
     - Tags and categories.
     - Text detection (OCR).

## 🥘 Key Features

- **Accuracy and Efficiency**: Utilizes the powerful Azure Computer Vision service to ensure precise and quick analysis.
- **Attractive User Interface**: Developed with HTML, CSS, and JavaScript to offer a friendly and responsive user experience.
- **Simple and Secure Connection**: Communication between the frontend and backend is done via REST API, ensuring seamless and secure integration.

## 🏆 Project Benefits

- **Automated Image Analysis**: Facilitates automated image analysis, saving time and effort on manual tasks.
- **Accessibility**: Available as a web application, accessible from any device with a browser.
- **Scalability**: Uses Azure cloud services, allowing for easy scaling based on demand.
