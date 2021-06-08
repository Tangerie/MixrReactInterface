Folder Structure:
    build => Project builds
    node_modules => Dependancies etc.
    public => Part of the webpage, not touched by react
    src => React and web code <- This is the good Part
        components => Extra modular component code
        helpers => Utilities and such
        img => Images or media
        lib => Custom libraries
            GlobalStore => A store library (Made by me)
        models => Data structures / record definitions
        routes => Pages
        styles => Custom styles

index.tsx is the entry point for the application but it points directly to App.tsx

The search and sort is in components/SpotifyScatter.tsx