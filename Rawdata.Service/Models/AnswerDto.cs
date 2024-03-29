using System;
using System.Collections.Generic;

namespace Rawdata.Service.Models
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int Score { get; set; }
        public string Body { get; set; }
        public DateTime CreationDate { get; set; }
        public string AuthorDisplayName { get; set; }
        public IList<CommentDto> Comments { get; set; }
        public AnswerDtoLink Links { get; set; }
        
        public bool Marked { get; set; }
        public string Note { get; set; }

        public class AnswerDtoLink
        {
            public string Self { get; set; }
            public string Parent { get; set; }
            public string Author { get; set; }
        }
    }
}
