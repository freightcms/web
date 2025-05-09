import { useQuery, gql } from "@apollo/client";

const queryKey = gql`
  query GetForm($formName: String!) {
    forms(name: $formName) {
      configs
    }
  }
`;

export const useForm = (formName: string) =>
  useQuery(queryKey, {
    variables: {
      formName,
    },
  });
