# SkillSwap Screenshots Checklist

## 📸 Required Screenshots for Portfolio/Documentation

### 1. Landing Page (Home)
- [ ] Full page view showing hero section
- [ ] Feature cards section
- [ ] Footer with navigation
- **File name**: `01-home.png`

### 2. Dashboard
- [ ] User profile section with avatar
- [ ] Stats cards (Matches, Sessions, Skills)
- [ ] Skills offered/wanted pills
- [ ] Recent activity feed
- [ ] Quick action buttons
- **File name**: `02-dashboard.png`

### 3. Matches Page
- [ ] Header with search bar
- [ ] Match cards grid view
- [ ] Match strength indicators
- [ ] Status badges (New, Contacted, Session Booked)
- [ ] Skill pills (offered/wanted)
- **File name**: `03-matches.png`

### 4. Single Match Card (Zoomed)
- [ ] Partner avatar and name
- [ ] Bio text
- [ ] Match strength bar with percentage
- [ ] Skills offered section
- [ ] Skills wanted section
- [ ] Request session button
- **File name**: `04-match-card.png`

### 5. Sessions Page
- [ ] Header with session counts
- [ ] Timeline view with status groups
- [ ] "Happening now" section
- [ ] "Scheduled" section
- [ ] "Completed" section
- **File name**: `05-sessions.png`

### 6. Session Card (Upcoming)
- [ ] Partner avatar and name
- [ ] Session topic
- [ ] Skill exchange pills
- [ ] Date and time
- [ ] Mark complete button
- [ ] Cancel button
- **File name**: `06-session-upcoming.png`

### 7. Session Card (In Progress)
- [ ] In progress status badge
- [ ] Green "Mark complete" button
- **File name**: `07-session-inprogress.png`

### 8. Session Card (Completed)
- [ ] Completed status badge
- [ ] "Exchange completed" message
- **File name**: `08-session-completed.png`

### 9. Sidebar Navigation
- [ ] Logo
- [ ] Dashboard link
- [ ] Matches link
- [ ] Sessions link
- [ ] User profile section
- **File name**: `09-sidebar.png`

### 10. Mobile Responsive Views
- [ ] Home page on mobile (375px width)
- [ ] Dashboard on mobile
- [ ] Matches on mobile
- [ ] Sessions on mobile
- **File names**: `10-mobile-home.png`, `11-mobile-dashboard.png`, `12-mobile-matches.png`, `13-mobile-sessions.png`

### 11. API Documentation Screenshots
- [ ] Health check endpoint response
- [ ] Users endpoint response
- [ ] Matches endpoint response
- [ ] Sessions endpoint response
- **File names**: `14-api-health.png`, `15-api-users.png`, `16-api-matches.png`, `17-api-sessions.png`

---

## 🎯 How to Take Screenshots

### Using macOS (Built-in)
1. **Full screen**: `Cmd + Shift + 3`
2. **Selection**: `Cmd + Shift + 4`
3. **Window**: `Cmd + Shift + 4` then `Space`

### Using Browser DevTools
1. Open DevTools (`Cmd + Option + I`)
2. Click device toolbar icon (or `Cmd + Shift + M`)
3. Select device size (e.g., iPhone 12 Pro)
4. Take screenshot

### Recommended Tools
- **CleanShot X** - Professional screenshots
- **Snagit** - Screen capture and editing
- **Chrome DevTools** - Responsive testing

---

## 📐 Screenshot Specifications

- **Resolution**: 1920x1080 (desktop), 375x812 (mobile)
- **Format**: PNG (lossless)
- **File size**: Under 500KB each
- **Naming**: Follow the checklist above
- **Storage**: `/screenshots/` folder in project root

---

## ✅ Quality Checklist

For each screenshot:
- [ ] No browser extensions visible
- [ ] Clean URL bar (or cropped out)
- [ ] No sensitive data visible
- [ ] Consistent zoom level (100%)
- [ ] Good lighting/contrast
- [ ] No UI glitches
- [ ] Text is readable
- [ ] Colors are accurate

---

## 📁 Folder Structure

```
skillswap/
├── screenshots/
│   ├── desktop/
│   │   ├── 01-home.png
│   │   ├── 02-dashboard.png
│   │   ├── 03-matches.png
│   │   ├── 04-match-card.png
│   │   ├── 05-sessions.png
│   │   ├── 06-session-upcoming.png
│   │   ├── 07-session-inprogress.png
│   │   ├── 08-session-completed.png
│   │   └── 09-sidebar.png
│   ├── mobile/
│   │   ├── 10-mobile-home.png
│   │   ├── 11-mobile-dashboard.png
│   │   ├── 12-mobile-matches.png
│   │   └── 13-mobile-sessions.png
│   └── api/
│       ├── 14-api-health.png
│       ├── 15-api-users.png
│       ├── 16-api-matches.png
│       └── 17-api-sessions.png
```
