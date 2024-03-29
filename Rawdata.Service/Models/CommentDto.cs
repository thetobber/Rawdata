using System;
using System.Collections.Generic;
using Rawdata.Data.Models;

namespace Rawdata.Service.Models
{
    public class CommentDto
    {    
        public int Id { get; set; }
        public int Score { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public string AuthorDisplayName { get; set; }
        public CommentDtoLinks Links { get; set; }
        public string Note { get; set; }
        public bool Marked { get; set; }
        
        public int QuestionId { get; set; }

        public class CommentDtoLinks
        {
            public string Self { get; set; }
            public string Author { get; set; }
        }
    }
}
