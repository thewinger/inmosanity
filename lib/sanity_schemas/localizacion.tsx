import {HiOutlineMap} from 'react-icons/hi2'

interface IPrepare {
  title: string
  subtitle: string
}

export default {
  name: 'localizacion',
  title: 'Localización',
  type: 'document',
  icon: HiOutlineMap,
  fields: [
    {name: 'title', title: 'Zona', type: 'string'},
    {
      name: 'parent',
      title: 'Ciudad',
      type: 'reference',
      to: [{type: 'localizacion'}],
      // This ensures we cannot select other "children"
      options: {
        filter: '!defined(parent)',
      },
    },
  ],
  // Customise the preview so parents are visualised in the studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    prepare: ({title, subtitle}: IPrepare) => ({
      title,
      subtitle: subtitle ? `– ${subtitle}` : ``,
    }),
  },
}
