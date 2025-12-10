# Click-Aloysius
Click Aloysius: Project 
Click Aloysius is an advanced, secure, and user-centric photo management system designed exclusively for college events conducted under staff coordination. The system enables organized storage, controlled upload, and broad viewing of event photographs, ensuring privacy, transparency, and community sharing.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rithan678/Click-Aloysius.git
   cd Click-Aloysius
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Configure .env file with your database credentials
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Database Setup:**
   - Create a MySQL database named `click_aloy`
   - Run the schema.sql file in the database folder

### Project Structure
```
Click-Aloysius/
├── backend/          # Node.js Express API
├── frontend/         # React application
├── database/         # MySQL schema and scripts
└── README.md
```

## Key Features:
- Staff coordinators create events and pre-approve students by their college registration numbers to upload event photos.
- Only pre-approved students can upload photos directly; the approval workflow remains with staff for quality and privacy oversight.
- All students and staff have open access to view and freely download approved photos across events.
- A personalized “Your Photos” tab uses AI-driven face recognition to show students images where they appear, improving discoverability and engagement.
- A comprehensive analytics dashboard provides staff and admins with data on uploads, approvals, views, downloads, and popular content to guide event and content management.
- Secure login with strong authentication and privacy protections keeps data safe.
- AI and ML features include automatic photo tagging, image quality validation, content moderation, anomaly detection, and smart recommendation for efficient management.
- Additional enhancements include live event streaming integration, photo collaboration and editing tools, offline mobile uploads, ERP system synchronization, AI-generated event highlight reels, multilingual support, and customizable privacy settings.

Benefits:
- Streamlines event photo management for staff and students with clear role-based permissions.
- Enhances user experience through AI personalization and rich media tools.
- Promotes transparency, security, and consent compliance.
- Supports college digital initiatives by integrating with existing systems and offering mobile-friendly access.

Click Aloysius is positioned to become the go-to platform for seamless, secure, and interactive college event photography management, empowering both staff and students while maintaining high standards of privacy and content quality.[1][11][12][13][14]
