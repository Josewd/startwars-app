# Star Wars Explorer App

A modern React application that provides an interactive interface to explore the Star Wars universe using the [Star Wars API (SWAPI)](https://swapi.py4e.com/). Browse through planets, characters, starships, films, species, and vehicles with a responsive and intuitive design.

## 🚀 Features

- **Comprehensive Data Explorer**: Browse through all major Star Wars entities:
  - 🌍 **Planets** - Discover worlds from across the galaxy
  - 👥 **People** - Explore characters and their details
  - 🎬 **Films** - View movie information and connections
  - 🚀 **Starships** - Examine spacecraft specifications
  - 🧬 **Species** - Learn about different alien races
  - 🚗 **Vehicles** - Browse ground and atmospheric vehicles

- **Advanced Navigation**:
  - Responsive sidebar navigation
  - Mobile-friendly menu system
  - Direct routing to specific items
  - Breadcrumb navigation

- **Enhanced User Experience**:
  - Real-time search functionality
  - Infinite scroll for large datasets
  - Loading states and error handling
  - Auto-focus input fields
  - Detailed item views with related information

- **Modern Tech Stack**:
  - ⚛️ React 19 with TypeScript
  - 🎨 Material-UI components
  - 🛣️ React Router for navigation
  - 📱 Fully responsive design
  - 🔄 Cached API requests for performance

## 🛠️ Technologies Used

- **Frontend Framework**: React 19.1.1 with TypeScript
- **UI Library**: Material-UI (MUI) v7.2.0
- **Routing**: React Router v7.7.1
- **API**: Star Wars API (SWAPI)
- **Styling**: SCSS + Material-UI theming
- **Build Tool**: Create React App
- **Testing**: React Testing Library & Jest

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd starwars/startwars-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- Hot reloading enabled
- Displays lint errors in console
- Real-time error reporting

### `npm test`
Launches the test runner in interactive watch mode.
- Runs unit tests and integration tests
- Provides coverage reports
- Watch mode for continuous testing

### `npm run build`
Creates an optimized production build in the `build` folder.
- Minified and optimized code
- Hashed filenames for caching
- Ready for deployment

### `npm run eject`
⚠️ **One-way operation** - Exposes internal configuration files.
Use only if you need full control over webpack, Babel, ESLint configurations.

## 🗂️ Project Structure

```
startwars-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── card/          # Data display cards
│   │   ├── sidebar/       # Navigation sidebar
│   │   ├── loading/       # Loading indicators
│   │   └── ...
│   ├── pages/             # Route components
│   │   ├── planet/        # Planet pages
│   │   ├── people/        # People pages
│   │   ├── starship/      # Starship pages
│   │   └── ...
│   ├── service/           # API service layer
│   ├── types/             # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── routes/            # Routing configuration
│   └── utils/             # Utility functions
└── package.json
```

## 🌐 API Integration

This app integrates with the [Star Wars API (SWAPI)](https://swapi.py4e.com/) to provide:

- **Cached requests** for improved performance
- **Error handling** with user-friendly messages
- **Pagination support** for large datasets
- **Search functionality** across all endpoints
- **Related resource resolution** for detailed views

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with comprehensive layouts
- **Tablet**: Collapsible sidebar with optimized spacing
- **Mobile**: Hamburger menu with touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Star Wars API Documentation](https://swapi.py4e.com/documentation)
- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

---

*May the Force be with you! 🌟*
