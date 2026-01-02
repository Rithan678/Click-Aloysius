// Mock Database Module for Testing
// This provides a simple in-memory database for development/testing
// Replace with real MySQL when database is available

class MockDatabase {
  constructor() {
    this.users = [
      {
        id: 1,
        registration_number: 'REG001',
        email: 'student1@college.edu',
        name: 'John Doe',
        role: 'student',
      },
      {
        id: 2,
        registration_number: 'REG002',
        email: 'staff@college.edu',
        name: 'Staff Member',
        role: 'staff',
      },
    ];

    this.events = [
      {
        id: 1,
        title: 'Annual Fest 2026',
        description: 'Annual college festival',
        event_date: '2026-01-15',
        created_by: 2,
        status: 'active',
      },
      {
        id: 2,
        title: 'Tech Conference',
        description: 'Technical conference for students',
        event_date: '2026-02-20',
        created_by: 2,
        status: 'active',
      },
    ];

    this.photos = [
      {
        id: 1,
        event_id: 1,
        filename: 'photo_1.jpg',
        original_filename: 'festival_photo_1.jpg',
        file_path: '/uploads/photos/photo_1.jpg',
        uploaded_by: 1,
        status: 'approved',
        created_at: '2026-01-15T10:30:00',
      },
      {
        id: 2,
        event_id: 1,
        filename: 'photo_2.jpg',
        original_filename: 'festival_photo_2.jpg',
        file_path: '/uploads/photos/photo_2.jpg',
        uploaded_by: 1,
        status: 'approved',
        created_at: '2026-01-15T10:35:00',
      },
    ];

    this.eventPermissions = [
      {
        id: 1,
        event_id: 1,
        user_id: 1,
        can_upload: true,
      },
      {
        id: 2,
        event_id: 2,
        user_id: 1,
        can_upload: true,
      },
    ];

    this.analytics = [];
  }

  // Query methods
  query(sql, values = []) {
    return new Promise((resolve, reject) => {
      // Simulate database delay
      setTimeout(() => {
        try {
          // Parse simple SELECT queries
          if (sql.includes('SELECT') && sql.includes('FROM')) {
            resolve([]);
          } else if (sql.includes('INSERT')) {
            resolve({ insertId: Math.floor(Math.random() * 1000) });
          } else if (sql.includes('UPDATE')) {
            resolve({ affectedRows: 1 });
          } else if (sql.includes('DELETE')) {
            resolve({ affectedRows: 1 });
          } else {
            resolve([]);
          }
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  // Users
  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  getAllUsers() {
    return this.users;
  }

  createUser(user) {
    const newUser = { id: Math.max(...this.users.map(u => u.id), 0) + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  // Events
  getEvent(id) {
    return this.events.find(e => e.id === id);
  }

  getAllEvents() {
    return this.events;
  }

  createEvent(event) {
    const newEvent = { id: Math.max(...this.events.map(e => e.id), 0) + 1, ...event };
    this.events.push(newEvent);
    return newEvent;
  }

  // Photos
  getPhoto(id) {
    return this.photos.find(p => p.id === id);
  }

  getPhotosByEvent(eventId, status = null) {
    let photos = this.photos.filter(p => p.event_id === eventId);
    if (status) {
      photos = photos.filter(p => p.status === status);
    }
    return photos;
  }

  getAllPhotos(status = null) {
    let photos = this.photos;
    if (status) {
      photos = photos.filter(p => p.status === status);
    }
    return photos;
  }

  createPhoto(photo) {
    const newPhoto = { id: Math.max(...this.photos.map(p => p.id), 0) + 1, ...photo };
    this.photos.push(newPhoto);
    return newPhoto;
  }

  updatePhotoStatus(photoId, status, approvedBy = null) {
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      photo.status = status;
      if (approvedBy) photo.approved_by = approvedBy;
      if (status === 'approved') photo.approved_at = new Date().toISOString();
    }
    return photo;
  }

  // Permissions
  getEventPermission(eventId, userId) {
    return this.eventPermissions.find(
      p => p.event_id === eventId && p.user_id === userId
    );
  }

  addEventPermission(eventId, userId, canUpload = true) {
    const permission = {
      id: Math.max(...this.eventPermissions.map(p => p.id), 0) + 1,
      event_id: eventId,
      user_id: userId,
      can_upload: canUpload,
    };
    this.eventPermissions.push(permission);
    return permission;
  }

  // Analytics
  recordAnalytic(photoId, eventId, userId, action) {
    const analytic = {
      id: this.analytics.length + 1,
      photo_id: photoId,
      event_id: eventId,
      user_id: userId,
      action,
      created_at: new Date().toISOString(),
    };
    this.analytics.push(analytic);
    return analytic;
  }

  // Connection methods (for compatibility)
  connect(callback) {
    console.log('✓ Mock Database Connected');
    if (callback) callback();
  }

  end() {
    console.log('Mock Database Connection Closed');
  }
}

module.exports = new MockDatabase();
