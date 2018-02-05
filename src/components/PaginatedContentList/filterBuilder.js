import _ from 'lodash'

class Term {
  constructor(filter) {
    this.filter = filter
  }

  static compose(term1, term2) {
    return new Term(lesson => term1.filter(lesson) && term2.filter(lesson))
  }
}

const NilTerm = {
  filter: () => true,
}

class SearchTerm extends Term {
  static from(value) {
    return new SearchTerm(
      lesson =>
        lesson.title.toLowerCase().includes(value) ||
        lesson.instructor.name.toLowerCase().includes(value),
    )
  }
}

class FieldTerm extends Term {
  static from(field, value) {
    return new FieldTerm(lesson => {
      const fieldValue = _.get(lesson, FieldTerm.fieldToGetter(field))
      return fieldValue && fieldValue.toLowerCase().includes(value)
    })
  }

  static fieldToGetter(field) {
    switch (field) {
      case 'instructor':
        return ['instructor', 'name']
      default:
        return [field]
    }
  }
}

// Function that takes user input and returns function for filtering
// lessons. The valid syntax is plain text or field:value, e.g.
// "rxjs instructor:Roy" will search both instructor name and title for
// rxjs and instructor for Roy. Search is case insensitive.
export default input => {
  if (!input) return NilTerm.filter
  return input
    .split(' ')
    .map(word => {
      if (!word) return NilTerm
      const [firstWord, secondWord] = word.split(':')
      return secondWord
        ? FieldTerm.from(firstWord, secondWord)
        : SearchTerm.from(firstWord)
    })
    .reduce(Term.compose, NilTerm).filter
}
