# Para Execultar o projeto siga os seguintes passos 

1. Clone o repositório do Git
2. Abra o terminal na pasta app_mobile
3. Execute o npm install
4. Execute o projeto com npx expo start

# Organização das pastas

Mobile_App
├── app_mobile
│   ├── assets
│   │   ├── images
│   │   │   ├── adaptive-icon.png
│   │   │   ├── logo.png
│   │   │   └── splash.png
│   ├── app
│   │   ├── (tabs)
│   │   │   ├── _layout.tsx
│   │   │   ├── explore.tsx
│   │   │   └── index.tsx
│   │   ├── _layout.tsx
│   │   ├── +html.tsx
│   │   └── +not-found.tsx
│   ├── components
│   │   ├── navigation
│   │   │   └── TabBarIcon.tsx
│   │   ├── __tests__
│   │   │   ├── ThemedText-test.tsx
│   │   │   └── __snapshots__
│   │   │       └── ThemedText-test.tsx.snap
│   │   ├── Collapsible.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── HelloWave.tsx
│   │   ├── ParallaxScrollView.tsx
│   │   ├── ThemedText.tsx
│   │   └── ThemedView.tsx
│   ├── hooks
│   │   ├── useColorScheme.ts
│   │   ├── useColorScheme.web.ts
│   │   └── useThemeColor.ts
│   ├── navigation
│   │   ├── MainNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── screens
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── SavedResponsesScreen.tsx
│   ├── constants
│   │   └── Colors.ts
│   ├── scripts
│   │   └── reset-project.js
│   ├── firebase.js
│   ├── App.tsx
│   ├── app.json
│   ├── babel.config.js
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── README.md