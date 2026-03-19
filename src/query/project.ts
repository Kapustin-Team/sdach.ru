export default function projectQuery(slug: string) {
  return `{
    projects(filters: { slug: { eq: "${slug}" } }) {
      data {
        attributes {
          title
          slug
          price
          tags
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
          gallery {
            data {
              attributes {
                url
              }
            }
          }
          specs {
            label
            value
          }
          content {
            __typename
            ... on ComponentBlocksAdvantages {
              id
              items {
                icon { data { attributes { url } } }
                title
                description
              }
            }
            ... on ComponentBlocksConsultation {
              id
              title
              subtitle
            }
          }
          seo {
            metaTitle
            metaDescription
            metaImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }`
}
