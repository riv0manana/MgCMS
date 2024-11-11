# MgCMS

MgCMS is a basic e-commerce CMS built with Next.js and Appwrite. It follows a **code-first** approach, allowing developers to customize it as needed. The CMS is designed with **Component Driven Development** and **Atomic Design** principles in mind, making it modular and easy to extend. MgCMS separates backend logic from the frontend using **server actions**, ensuring seamless customization of the front end.

## Features

- **Code-First Approach**: Full flexibility for developers to customize and extend the platform.
- **Component Driven Development**: Build reusable, modular components.
- **Atomic Design**: Easily scalable design system by breaking the UI into smaller components.
- **Next.js Framework**: Modern, fast, and SEO-friendly React framework.
- **Appwrite Integration**: Use Appwrite as the database for secure and fast data management.
- **Frontend Flexibility**: With isolated backend logic, developers can freely adjust the frontend for unique requirements.


## Getting Started

### Prerequisites

To get started with MgCMS, you need:

- **Node.js**: v16 or later
- **Next.js**: v14 or later
- **Appwrite**: Running on your server or cloud instance
- **Git**: For version control and cloning the repository

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/riv0manana/MgCMS.git
   cd MgCMS

2. Install dependencies:

   ```bash
   npm install

1. Set up Appwrite:

  - Make sure you have Appwrite set up and running.
  - Create a new Appwrite project and configure your environment variables in a .env file:

    ```bash
    NEXT_PUBLIC_APPWRITE_ENDPOINT=
    NEXT_PUBLIC_APPWRITE_PROJECT=
    APPWRITE_DATABASE_ID=
    NEXT_APPWRITE_KEY=

    #APP KEYS
    NEXT_PUBLIC_CLOUDINARY_PRESET=
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

    #Enable Vanilla pay
    VANILLA_PAY_ID=
    VANILLA_PAY_SECRET=
    VANILLA_PAY_PB_KEY=
    VANILLA_PAY_PRV_KEY=
    
    #Enable realtime order gps tracking from Tracking.mg
    TRACKING_MG_KEY=

    #APP_CONFIG
    PAY_NAME=
    PAY_NUMBER=
    WEBDOMAIN=
    STORENAME=
    
4. Start the development server::

   ```bash
   npm run dev

5. Access MgCMS Store demo page at `http://localhost:3000`.

6. Access MgCMS Manager page at `http://localhost:3000/dashboard`.

## File Structure

    ```bash
    mgcms/
    ├── components/    # UI components
    ├── app/           # Next.js pages
    ├── services/      # Server actions & external API
    ├── lib/           # Shared utilities
    ├── messages/      # i18n files
    ├── public/        # Static assets
    ├── .env.example   # Environment variables
    ├── package.json   # Project dependencies and scripts
    └── README.md      # Project documentation

## Customizations

MgCMS allows full customization of both the backend and frontend:

   - **Frontend Customization**: The front end is built using components based on Atomic Design. You can easily extend or override any components to suit your project needs. On user faced UI, we added render props to support rendering your own customized components with all props needed.
   - **Backend Customization**: The backend is isolated and uses server actions that make it easy to connect to your own APIs or extend existing functionality without altering the frontend.

## Next steps

MgCMS is in its starting stage. Well I Hope locale community gets familiar with it and make the adoption smooth.

What is planned:

   - **Themes repository**: Allow install custom styles from community
   - **Booking**: Allow to create bookable item + dashboard, allowing to create a booking store from the CMS

## Licensing

This project is licensed under the **Creative Commons Attribution-NonCommercial (CC BY-NC)** license for non-profit and community use. For more details, see [LICENSE](./LICENSE).

For commercial use, a one-time license fee per domain is required. Commercial users are allowed to modify, distribute, and use the software for profit. To review the terms, please see [LICENSE-COMMERCIAL](./LICENSE-COMMERCIAL.md).

Contact **contact@riv0manana.dev** to purchase a commercial license.