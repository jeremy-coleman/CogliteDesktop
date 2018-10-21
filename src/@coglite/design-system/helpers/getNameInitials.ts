//@ts-ignore
// var zzz = 'Foo Bar 1Name too Long';
// var initials = zzz.match(/\b\w/g) || [];
// zzz = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
// alert(initials);

export function getNameInitials(input){
   let initials = input.match(/\b\w/g) || [];
   ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
   return initials
}

