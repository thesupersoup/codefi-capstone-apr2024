import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'resultsfilter',
  pure: false
})

export class ResultsFilterPipe implements PipeTransform{
  transform(results: any[], filter: string) {
    if (!results || !filter) {
      return results
    }

    return results.filter(results => results.role == filter)
  }
}
