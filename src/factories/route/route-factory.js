import { Route } from "@models";


export const create = (route) => {
  if (!route) {
    return undefined;
  }
  
  let obj = new Route();

  if(route.webId) obj.webId = route.webId;
  if(route.name) obj.name = route.name;
  if(route.description) obj.description = route.description;
  if(route.distance) obj.distance = route.distance;
  if(route.slope) obj.slope = route.slope;
  if(route.rank) obj.rank = route.rank;
  if(route.createdBy) obj.createdBy = route.createdBy;
  if(route.createdAt) obj.createdAt = route.createdAt;
  if(route.messages) obj.messages = Array.isArray(route.messages) ? route.messages.filter(m => m !== route.webId) : route.messages;
  if(route.milestones) obj.milestones = Array.isArray(route.milestones) ? route.milestones.filter(m => m !== route.webId) : route.milestones;
  if(route.media) obj.media = Array.isArray(route.media) ? route.media.filter(m => m !== route.webId) : route.media;

  return obj;
}