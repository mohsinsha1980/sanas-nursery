# Sanas Nursery Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS. This website serves as a temporary landing page while the main website is under construction.

## ✨ Features

- 🚀 **Next.js 14** with App Router
- 💻 **TypeScript** for type safety
- 🎨 **Tailwind CSS** with custom color scheme (Orange & Dark Green)
- 📱 **Responsive Design** for all devices
- 🔍 **SEO Optimized** with proper meta tags
- 📹 **YouTube Video Integration** with carousel display
- 📧 **Contact Form** with ZeptoMail API integration
- 📄 **4 Complete Pages**: Home, Contact, Privacy Policy, Terms & Conditions

## 🎨 Color Scheme

Based on the Sanas Nursery logo:

- **Primary (Orange)**: #f97316 - #ea580c
- **Secondary (Dark Green)**: #16a34a - #14532d
- **Accent (Neutral)**: #64748b - #0f172a

## 📱 Pages

1. **Home Page** (`/`) - Landing page with hero section, YouTube videos, and features
2. **Contact Us** (`/contact`) - Contact form with ZeptoMail integration and company information
3. **Privacy Policy** (`/privacy-policy`) - Comprehensive privacy information
4. **Terms & Conditions** (`/terms-conditions`) - Legal terms and conditions

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Icons**: Heroicons (SVG)
- **Email Service**: ZeptoMail API
- **Form Handling**: React hooks with validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- ZeptoMail API account (for contact form)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd sanas-nursery
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   ZEPTO_API_KEY=your_zeptomail_api_key_here
   ZEPTO_FROM_EMAIL=noreply@sanasnursery.com
   ADMIN_EMAIL=sanasnursery@gmail.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3333](http://localhost:3333)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
sanas-nursery/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page with YouTube videos
│   ├── contact/           # Contact page with form
│   ├── privacy-policy/    # Privacy Policy page
│   ├── terms-conditions/  # Terms & Conditions page
│   └── api/               # API routes
│       └── contact/       # Contact form API with ZeptoMail
├── components/             # Reusable components
│   ├── Header.tsx         # Navigation header (Home & Contact only)
│   └── Footer.tsx         # Site footer with all links
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── SETUP.md                # Detailed setup instructions
└── README.md               # This file
```

## 🎯 Key Features

### YouTube Video Integration

- Responsive video grid layout
- 4 featured videos with descriptions
- Easy to customize video IDs and content
- Optimized for mobile and desktop

### Contact Form

- Full form validation
- ZeptoMail API integration
- Professional email templates
- Success/error messaging
- WhatsApp contact information

### Navigation

- Clean header with Home & Contact links only
- Legal pages moved to footer
- Mobile-responsive navigation
- Smooth transitions and hover effects

## 🎨 Customization

### Colors

The color scheme can be modified in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#fff7ed',    // Orange shades
    500: '#f97316',
    600: '#ea580c',
  },
  secondary: {
    50: '#f0fdf4',    // Green shades
    500: '#22c55e',
    600: '#16a34a',
  },
  accent: {
    50: '#f8fafc',    // Neutral shades
    500: '#64748b',
    900: '#0f172a',
  }
}
```

### Content

- Update company information in components
- Modify page content in respective page files
- Customize YouTube videos in `app/page.tsx`
- Update contact information and legal text

### Styling

- Custom CSS classes in `app/globals.css`
- Component-specific styles use Tailwind utility classes
- Responsive design built-in with Tailwind breakpoints

## 📧 Email Configuration

The contact form uses ZeptoMail API for reliable email delivery:

1. **Sign up** at [ZeptoMail](https://www.zoho.com/zeptomail/)
2. **Get API key** from your dashboard
3. **Set environment variables** in `.env.local`
4. **Verify sender email** in ZeptoMail dashboard

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **AWS Amplify**: Build command: `npm run build`
- **Traditional hosting**: Build with `npm run build` and upload the `.next` folder

**Important**: Don't forget to set environment variables in your hosting platform!

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Documentation

- **SETUP.md**: Detailed setup and configuration guide
- **Environment Variables**: Required for contact form functionality
- **YouTube Videos**: Easy customization guide
- **Deployment**: Platform-specific instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:

- **Email**: sanasnursery@gmail.com
- **WhatsApp**: +91 8999481616 / +91 9090401616
- **Contact Form**: [Contact Page](/contact)
- **Setup Help**: See [SETUP.md](./SETUP.md)

## 🗺️ Roadmap

- [x] YouTube video integration
- [x] ZeptoMail API integration
- [x] Updated color scheme
- [x] Professional contact form
- [x] Legal pages with real content
- [ ] Add blog/news section
- [ ] Implement newsletter signup
- [ ] Add social media integration
- [ ] Create admin dashboard
- [ ] Add analytics tracking

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS for **Wholesale Nursery Plants (SANAS)**
