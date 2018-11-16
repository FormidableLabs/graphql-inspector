import {GraphQLUnionType, GraphQLObjectType} from 'graphql';
import {Change, CriticalityLevel} from './change';

export function unionMemberRemoved(
  union: GraphQLUnionType,
  type: GraphQLObjectType,
): Change {
  return {
    criticality: {
      level: CriticalityLevel.Breaking,
      reason:
        'Removing a union member from a union can cause existing queries that use this union member in a fragment spread to error.',
    },
    message: `Member '${type.name}' was removed from Union '${union.name}'`,
    path: union.name,
  };
}

export function unionMemberAdded(
  union: GraphQLUnionType,
  type: GraphQLObjectType,
): Change {
  return {
    criticality: {
      level: CriticalityLevel.Breaking,
      reason:
        'Adding a possible type to Unions may break existing clients that were not programming defensively against a new possible type.',
    },
    message: `Member '${type.name}' was added to Union '${union.name}'`,
    path: union.name,
  };
}
