export interface SiteImage {
  url: string
  alt: string
}

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`
}

export const IMAGES = {
  heroWorkspace: {
    url: unsplash('photo-1498050108023-c5249f4df085', 1200),
    alt: 'Laptop displaying lines of code on a desk',
  },
  aboutTeam: {
    url: unsplash('photo-1521737604893-d14cc237f11d', 1000),
    alt: 'Two people looking at a laptop screen together, troubleshooting',
  },
  serviceSupport: {
    url: unsplash('photo-1581091226825-a6a2a5aee158', 900),
    alt: 'Technician working on an open desktop computer',
  },
  serviceDevices: {
    url: unsplash('photo-1517430816045-df4b7de11d1d', 900),
    alt: 'Smartphone and laptop side by side on a desk',
  },
  serviceSoftware: {
    url: unsplash('photo-1516321318423-f06f85e504b3', 900),
    alt: 'Close-up of code on a computer monitor',
  },
  serviceNetworking: {
    url: unsplash('photo-1544197150-b99a580bb7a8', 900),
    alt: 'Networking cables connected to a router switch',
  },
  serviceConsulting: {
    url: unsplash('photo-1552664730-d307ca884978', 900),
    alt: 'Two people in a discussion over a laptop at a desk',
  },
  serviceWeb: {
    url: unsplash('photo-1547658719-da2b51169166', 900),
    alt: 'Website design mockups displayed on a monitor',
  },
  capabilitiesOffice: {
    url: unsplash('photo-1573164713988-8665fc963095', 1100),
    alt: 'Modern office desk with a laptop, notebook and coffee',
  },
  contactSupport: {
    url: unsplash('photo-1560472354-b33ff0c44a43', 1100),
    alt: 'Server room with illuminated network racks',
  },
  gallery: [
    {
      url: unsplash('photo-1531297484001-80022131f5a1', 900),
      alt: 'Laptop open on a desk in a bright workspace',
    },
    {
      url: unsplash('photo-1519389950473-47ba0277781c', 900),
      alt: 'Team gathered around a table working on laptops',
    },
    {
      url: unsplash('photo-1522071820081-009f0129c71c', 900),
      alt: 'Close-up of hands typing on a laptop keyboard',
    },
    {
      url: unsplash('photo-1518770660439-4636190af475', 900),
      alt: 'Circuit board close-up showing electronic components',
    },
    {
      url: unsplash('photo-1550751827-4bd374c3f58b', 900),
      alt: 'Rows of illuminated server racks in a data room',
    },
  ] satisfies SiteImage[],
} satisfies Record<string, SiteImage | SiteImage[]>
